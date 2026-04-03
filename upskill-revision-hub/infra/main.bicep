// Main Bicep template for UpSkill Revision Hub deployment on Azure

param location string = resourceGroup().location
param appName string
param environment string = 'dev'
param acrName string
param acrResourceGroup string
param containerImage string
param containerPort int = 3000

// Tags for resource organization
param tags object = {
  project: 'UpSkill'
  environment: environment
  deployedAt: utcNow('u')
}

// Generate unique names
var appServicePlanName = '${appName}-plan-${environment}'
var appServiceName = '${appName}-${environment}'
var appInsightsName = '${appName}-insights-${environment}'
var logAnalyticsName = '${appName}-logs-${environment}'
var containerRegistryId = '/subscriptions/${subscription().subscriptionId}/resourceGroups/${acrResourceGroup}/providers/Microsoft.ContainerRegistry/registries/${acrName}'

// Log Analytics Workspace for monitoring
resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2021-12-01-preview' = {
  name: logAnalyticsName
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

// Application Insights for monitoring
resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  tags: tags
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsWorkspace.id
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// App Service Plan (Linux)
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  kind: 'linux'
  tags: tags
  sku: {
    name: 'B1'
    tier: 'Basic'
    capacity: 1
  }
  properties: {
    reserved: true
  }
}

// App Service (Web App)
resource appService 'Microsoft.Web/sites@2022-03-01' = {
  name: appServiceName
  location: location
  kind: 'app,linux,container'
  tags: tags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${containerImage}'
      alwaysOn: true
      http20Enabled: true
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
      appSettings: [
        {
          name: 'WEBSITES_CONTAINER_ID'
          value: appName
        }
        {
          name: 'WEBSITES_PORT'
          value: '${containerPort}'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${acrName}.azurecr.io'
        }
        {
          name: 'DOCKER_ENABLE_CI'
          value: 'true'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: applicationInsights.properties.ConnectionString
        }
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '~3'
        }
        {
          name: 'XDT_MicrosoftApplicationInsights_Mode'
          value: 'recommended'
        }
        {
          name: 'NODE_ENV'
          value: 'production'
        }
      ]
      connectionStrings: [
        {
          name: 'ApplicationInsights'
          connectionString: applicationInsights.properties.ConnectionString
          type: 'Custom'
        }
      ]
    }
    httpsOnly: true
    publicNetworkAccess: 'Enabled'
  }
}

// App Service - Production Slot
resource productionSlot 'Microsoft.Web/sites/slots@2022-03-01' = {
  parent: appService
  name: 'production'
  location: location
  kind: 'app,linux,container'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${containerImage}'
      alwaysOn: true
      http20Enabled: true
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
      appSettings: [
        {
          name: 'WEBSITES_CONTAINER_ID'
          value: appName
        }
        {
          name: 'WEBSITES_PORT'
          value: '${containerPort}'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${acrName}.azurecr.io'
        }
        {
          name: 'DOCKER_ENABLE_CI'
          value: 'true'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: applicationInsights.properties.ConnectionString
        }
        {
          name: 'NODE_ENV'
          value: 'production'
        }
      ]
    }
    httpsOnly: true
    publicNetworkAccess: 'Enabled'
  }
}

// App Service - Staging Slot for blue-green deployments
resource stagingSlot 'Microsoft.Web/sites/slots@2022-03-01' = {
  parent: appService
  name: 'staging'
  location: location
  kind: 'app,linux,container'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${containerImage}'
      alwaysOn: true
      http20Enabled: true
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
      appSettings: [
        {
          name: 'WEBSITES_CONTAINER_ID'
          value: appName
        }
        {
          name: 'WEBSITES_PORT'
          value: '${containerPort}'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${acrName}.azurecr.io'
        }
        {
          name: 'DOCKER_ENABLE_CI'
          value: 'true'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: applicationInsights.properties.ConnectionString
        }
        {
          name: 'NODE_ENV'
          value: 'staging'
        }
      ]
    }
    httpsOnly: true
    publicNetworkAccess: 'Enabled'
  }
}

// Diagnostic Settings - Send logs to Log Analytics
resource diagnosticSettings 'Microsoft.Insights/diagnosticsSettings@2017-05-01-preview' = {
  name: '${appServiceName}-diagnostics'
  scope: appService
  properties: {
    workspaceId: logAnalyticsWorkspace.id
    logs: [
      {
        category: 'AppServiceHTTPLogs'
        enabled: true
        retentionPolicy: {
          days: 30
          enabled: true
        }
      }
      {
        category: 'AppServiceConsoleLogs'
        enabled: true
        retentionPolicy: {
          days: 30
          enabled: true
        }
      }
      {
        category: 'AppServiceApplicationLogs'
        enabled: true
        retentionPolicy: {
          days: 30
          enabled: true
        }
      }
    ]
    metrics: [
      {
        category: 'AllMetrics'
        enabled: true
        retentionPolicy: {
          days: 30
          enabled: true
        }
      }
    ]
  }
}

// Alert Rule - High CPU Usage
resource cpuAlertRule 'Microsoft.Insights/metricAlerts@2018-03-01' = {
  name: '${appServiceName}-high-cpu'
  location: 'global'
  tags: tags
  properties: {
    description: 'Alert when CPU exceeds 80%'
    severity: 2
    enabled: true
    scopes: [
      appService.id
    ]
    evaluationFrequency: 'PT5M'
    windowSize: 'PT15M'
    criteria: {
      'odata.type': 'Microsoft.Azure.Monitor.MultipleResourceMultipleMetricsCriteria'
      allOf: [
        {
          name: 'CpuPercentage'
          metricName: 'CpuPercentage'
          operator: 'GreaterThan'
          threshold: 80
          timeAggregation: 'Average'
        }
      ]
    }
    actions: []
  }
}

// Output the App Service URL and other important info
output appServiceUrl string = 'https://${appService.properties.defaultHostName}'
output appServiceName string = appService.name
output appServicePlanId string = appServicePlan.id
output applicationInsightsKey string = applicationInsights.properties.InstrumentationKey
output applicationInsightsConnectionString string = applicationInsights.properties.ConnectionString
output logAnalyticsWorkspaceId string = logAnalyticsWorkspace.id

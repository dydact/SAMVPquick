 
 
 import { Schema } from '@aws-amplify/datastore-types';

export const schema: Schema = {
  models: {
    Organization: {
      name: 'Organization',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        name: { type: 'String', isRequired: true },
        type: { type: 'AWSJSON', isRequired: true }, // 'PRIMARY' or 'CUSTOMER'
        staff: { type: 'HasMany', model: 'User' },
        clients: { type: 'HasMany', model: 'Client' },
        customFields: { type: 'AWSJSON' }, // For extensibility
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'public', operations: ['read'] },
          { allow: 'private', operations: ['create', 'update', 'delete'] },
        ],
      },
    },
    User: {
      name: 'User',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        email: { type: 'AWSEmail', isRequired: true },
        firstName: { type: 'String', isRequired: true },
        lastName: { type: 'String', isRequired: true },
        organizationID: { type: 'ID', isRequired: true },
        organization: { type: 'Belongs', model: 'Organization' },
        role: { type: 'AWSJSON', isRequired: true },
        permissions: { type: 'AWSJSON' },
        status: { type: 'String', isRequired: true }, // 'ACTIVE', 'INACTIVE', 'PENDING'
        lastLogin: { type: 'AWSDateTime' },
        profilePicture: { type: 'String' }, // S3 key for the profile picture
        profilePictureHash: { type: 'String' }, // Hash of the profile picture
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'owner' },
          { allow: 'private', operations: ['read'], provider: 'iam' },
        ],
      },
    },
    Client: {
      name: 'Client',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        firstName: { type: 'String', isRequired: true },
        lastName: { type: 'String', isRequired: true },
        birthday: { type: 'AWSDate', isRequired: true },
        socialSecurity: { type: 'String', isRequired: true },
        address: { type: 'String', isRequired: true },
        medicaidNumber: { type: 'String', isRequired: true },
        parentGuardian: { type: 'String' },
        school: { type: 'String' },
        serviceCoordinator: { type: 'String' },
        serviceRegion: { type: 'String', isRequired: true },
        organizationID: { type: 'ID', isRequired: true },
        organization: { type: 'Belongs', model: 'Organization' },
        assignedStaff: { type: 'HasMany', model: 'User' },
        treatmentPlans: { type: 'HasMany', model: 'TreatmentPlan' },
        clientType: { type: 'AWSJSON', isRequired: true }, // 'AUTISM_WAIVER' or 'DDA'
        status: { type: 'String', isRequired: true }, // 'ACTIVE', 'INACTIVE'
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
    TreatmentPlan: {
      name: 'TreatmentPlan',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        clientID: { type: 'ID', isRequired: true },
        client: { type: 'Belongs', model: 'Client' },
        tasks: { type: 'HasMany', model: 'Task' },
        services: { type: 'HasMany', model: 'Service' },
        startDate: { type: 'AWSDate', isRequired: true },
        endDate: { type: 'AWSDate', isRequired: true },
        status: { type: 'String', isRequired: true }, // 'DRAFT', 'ACTIVE', 'COMPLETED'
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
    Task: {
      name: 'Task',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        description: { type: 'String', isRequired: true },
        treatmentPlanID: { type: 'ID', isRequired: true },
        treatmentPlan: { type: 'Belongs', model: 'TreatmentPlan' },
        status: { type: 'String', isRequired: true }, // 'PENDING', 'IN_PROGRESS', 'COMPLETED'
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
    Service: {
      name: 'Service',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        name: { type: 'String', isRequired: true },
        description: { type: 'String' },
        treatmentPlanID: { type: 'ID', isRequired: true },
        treatmentPlan: { type: 'Belongs', model: 'TreatmentPlan' },
        renderedBy: { type: 'ID', isRequired: true },
        staff: { type: 'Belongs', model: 'User' },
        startTime: { type: 'AWSDateTime', isRequired: true },
        endTime: { type: 'AWSDateTime', isRequired: true },
        duration: { type: 'Int', isRequired: true }, // Duration in minutes
        status: { type: 'String', isRequired: true }, // 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'
        documentation: { type: 'HasOne', model: 'Documentation' },
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
    Documentation: {
      name: 'Documentation',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        serviceID: { type: 'ID', isRequired: true },
        service: { type: 'Belongs', model: 'Service' },
        progressNotes: { type: 'HasMany', model: 'ProgressNote' },
        status: { type: 'String', isRequired: true }, // 'DRAFT', 'SUBMITTED', 'APPROVED'
        submittedAt: { type: 'AWSDateTime' },
        approvedAt: { type: 'AWSDateTime' },
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
    ProgressNote: {
      name: 'ProgressNote',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        documentationID: { type: 'ID', isRequired: true },
        documentation: { type: 'Belongs', model: 'Documentation' },
        content: { type: 'String', isRequired: true },
        timestamp: { type: 'AWSDateTime', isRequired: true },
        createdBy: { type: 'ID', isRequired: true },
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
  },
  enums: {},
  nonModels: {},
  version: '1',
};
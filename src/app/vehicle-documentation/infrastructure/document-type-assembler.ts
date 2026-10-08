import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { DocumentType } from '../domain/model/document-type.entity';
import { DocumentTypeResource, DocumentTypesResponse } from './document-types-response';

export class DocumentTypeAssembler implements BaseAssembler<
  DocumentType,
  DocumentTypeResource,
  DocumentTypesResponse
> {
  toEntitiesFromResponse = (response: DocumentTypesResponse): DocumentType[] =>
    response.documentTypes.map((resource) => this.toEntityFromResource(resource));

  toEntityFromResource = (resource: DocumentTypeResource): DocumentType =>
    new DocumentType({
      id: resource.id,
      code: resource.code,
      name: resource.name,
      description: resource.description ?? '',
      isRequired: resource.isRequired,
      isActive: resource.isActive,
    });

  toResourceFromEntity = (entity: DocumentType): DocumentTypeResource => ({
    id: entity.id,
    code: entity.code,
    name: entity.name,
    description: entity.description,
    isRequired: entity.isRequired,
    isActive: entity.isActive,
  });
}

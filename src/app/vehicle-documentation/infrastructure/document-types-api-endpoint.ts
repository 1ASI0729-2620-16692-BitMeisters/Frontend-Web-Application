import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { DocumentType } from '../domain/model/document-type.entity';
import { DocumentTypeAssembler } from './document-type-assembler';
import { DocumentTypeResource, DocumentTypesResponse } from './document-types-response';

const documentTypesApiEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderDocumentTypesEndpointPath}`;

export class DocumentTypesApiEndpoint extends BaseApiEndpoint<
  DocumentType,
  DocumentTypeResource,
  DocumentTypesResponse,
  DocumentTypeAssembler
> {
  constructor(http: HttpClient) {
    super(http, documentTypesApiEndpointUrl, new DocumentTypeAssembler());
  }
}

import { describe, it, expect } from 'vitest';
import { VehicleDocument, VehicleDocumentInput, validateDocument, validDate, localDate } from './vehicle-document.entity';
import { DocumentStatus } from './document-status.enum';
const input: VehicleDocumentInput = {vehicleId:'v1',documentTypeId:'t1',number:'SOAT-1',issueDate:'2026-01-01',expirationDate:'2026-10-05',fileUrl:''};
function document(expirationDate: string) { return new VehicleDocument({...input,id:'1',createdAt:'',updatedAt:'',expirationDate}); }
describe('Vehicle documentation business rules (US32–US34)', () => {
  it('rejects a missing expiration date', () => expect(validateDocument({...input,expirationDate:''})).toBe(false));
  it('rejects nonexistent dates and reversed validity periods', () => {
    expect(validDate('2026-02-30')).toBe(false);
    expect(validateDocument({...input,issueDate:'2026-11-01'})).toBe(false);
  });
  it('accepts expired documents and derives EXPIRED', () => {
    expect(validateDocument(input)).toBe(true);
    expect(document('2026-10-04').recalculateStatus('2026-10-05')).toBe(DocumentStatus.EXPIRED);
  });
  it('includes today and the exact 30-day alert boundary', () => {
    expect(document('2026-10-05').recalculateStatus('2026-10-05')).toBe(DocumentStatus.EXPIRING);
    expect(document('2026-11-04').recalculateStatus('2026-10-05')).toBe(DocumentStatus.EXPIRING);
    expect(document('2026-11-05').recalculateStatus('2026-10-05')).toBe(DocumentStatus.VALID);
  });
  it('recalculates status after updating the expiration date', () => {
    const doc = document('2026-10-04');
    expect(doc.isExpired('2026-10-05')).toBe(true);
    doc.expirationDate='2027-01-01';
    expect(doc.recalculateStatus('2026-10-05')).toBe(DocumentStatus.VALID);
  });
  it('handles leap days and configurable alert thresholds', () => {
    expect(validDate('2028-02-29')).toBe(true);
    expect(document('2028-03-01').daysUntilExpiration('2028-02-28')).toBe(2);
    expect(document('2026-10-20').recalculateStatus('2026-10-05',7)).toBe(DocumentStatus.VALID);
    expect(localDate(new Date(2026,9,5,23,59))).toBe('2026-10-05');
  });
  it('rejects unsafe document links', () => {
    expect(validateDocument({...input,fileUrl:'javascript:alert(1)'})).toBe(false);
    expect(validateDocument({...input,fileUrl:'https://example.com/document.pdf'})).toBe(true);
  });
});

import { parseQRCodeString, toQRCodeDisplayable, toQRCodeObject, toQRCodeString } from '../../utils/huQRCodes';

describe('huQRCodes tests', () => {
  describe('toQRCodeDisplayable', () => {
    it('qrCode object', () => {
      expect(toQRCodeDisplayable({ code: 'the code', displayable: 'the displayable' })).toBe('the displayable');
    });
    it('qrCode object with missing displayable value', () => {
      expect(
        toQRCodeDisplayable({
          code: 'HU#1#{"id":"0de63cbd34708add7a9afbb423d0-05650","packingInfo":{"huUnitType":"LU","packingInstructionsId":1000006,"caption":"Euro Palette"},"product":{"id":1000001,"code":"2680","name":"Sternflow 11 Raps"},"attributes":[]}',
        })
      ).toEqual('05650');
    });
    it('qrCode string', () => {
      expect(
        toQRCodeDisplayable(
          'HU#1#{"id":"0de63cbd34708add7a9afbb423d0-05650","packingInfo":{"huUnitType":"LU","packingInstructionsId":1000006,"caption":"Euro Palette"},"product":{"id":1000001,"code":"2680","name":"Sternflow 11 Raps"},"attributes":[]}'
        )
      ).toEqual('05650');
    });
  });
  describe('toQRCodeString', () => {
    it('qrCode object', () => {
      expect(toQRCodeString({ code: 'the code', displayable: 'the displayable' })).toBe('the code');
    });
    it('qrCode string', () => {
      expect(toQRCodeString('string QR code')).toEqual('string QR code');
    });
  });
  describe('toQRCodeObject', () => {
    it('qrCode object', () => {
      expect(toQRCodeObject({ code: 'the code', displayable: 'the displayable' })).toEqual({
        code: 'the code',
        displayable: 'the displayable',
      });
    });
    it('qrCode string', () => {
      expect(
        toQRCodeObject(
          'HU#1#{"id":"0de63cbd34708add7a9afbb423d0-05650","packingInfo":{"huUnitType":"LU","packingInstructionsId":1000006,"caption":"Euro Palette"},"product":{"id":1000001,"code":"2680","name":"Sternflow 11 Raps"},"attributes":[]}'
        )
      ).toEqual({
        code: 'HU#1#{"id":"0de63cbd34708add7a9afbb423d0-05650","packingInfo":{"huUnitType":"LU","packingInstructionsId":1000006,"caption":"Euro Palette"},"product":{"id":1000001,"code":"2680","name":"Sternflow 11 Raps"},"attributes":[]}',
        displayable: '05650',
      });
    });
  });
  describe('parseQRCode', () => {
    it('unknown type', () => {
      const code =
        'UNKNOWN_TYPE#1#{"id":"0de63cbd34708add7a9afbb423d0-05650","packingInfo":{"huUnitType":"LU","packingInstructionsId":1000006,"caption":"Euro Palette"},"product":{"id":1000001,"code":"2680","name":"Sternflow 11 Raps"},"attributes":[]}';
      expect(() => parseQRCodeString(code)).toThrow(/Invalid global QR code/);
    });
    it('unknown version', () => {
      const code =
        'HU#UNKNOWN_VERSION#{"id":"0de63cbd34708add7a9afbb423d0-05650","packingInfo":{"huUnitType":"LU","packingInstructionsId":1000006,"caption":"Euro Palette"},"product":{"id":1000001,"code":"2680","name":"Sternflow 11 Raps"},"attributes":[]}';
      expect(() => parseQRCodeString(code)).toThrow(/Invalid global QR code/);
    });
    it('standard test', () => {
      const code =
        'HU#1#{"id":"0de63cbd34708add7a9afbb423d0-05650","packingInfo":{"huUnitType":"LU","packingInstructionsId":1000006,"caption":"Euro Palette"},"product":{"id":1000001,"code":"2680","name":"Sternflow 11 Raps"},"attributes":[]}';
      expect(parseQRCodeString(code)).toEqual({ code, displayable: '05650', productId: '1000001' });
    });
    it('QR code with attributes', () => {
      const code =
        'HU#1#{"id":"c9f94fa0d4268d63d86497b407ba-28193","packingInfo":{"huUnitType":"V","packingInstructionsId":101,"caption":"No Packing Item"},"product":{"id":2005577,"code":"P002737","name":"Convenience Salat 250g"},"attributes":[{"code":"HU_BestBeforeDate","displayName":"Mindesthaltbarkeit"},{"code":"Lot-Nummer","displayName":"Lot-Nummer"},{"code":"WeightNet","displayName":"Gewicht Netto","value":"2427.425"}]}';
      expect(parseQRCodeString(code)).toEqual({
        code,
        displayable: '28193',
        productId: '2005577',
        weightNet: 2427.425,
      });
    });
  });
});

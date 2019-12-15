import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor() {}

  geocode(
    request: google.maps.GeocoderRequest
  ): Promise<google.maps.GeocoderResult> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode(request, (result, status) => {
        if (this.geocodeResultCheck(status)) {
          resolve(result[0]);
        } else {
          reject(status);
        }
      });
    });
  }

  private geocodeResultCheck(status: google.maps.GeocoderStatus): boolean {
    if (status === google.maps.GeocoderStatus.OK) {
      return true;
    } else if (status === google.maps.GeocoderStatus.ERROR) {
      alert('接続に失敗しました。再度やり直してください。');
    } else if (status === google.maps.GeocoderStatus.INVALID_REQUEST) {
      alert('リクエストが無効です。');
    } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
      alert('時間をおいて再度やり直してください。');
    } else if (status === google.maps.GeocoderStatus.REQUEST_DENIED) {
      alert('Mapの利用が許可されていません。');
    } else if (status === google.maps.GeocoderStatus.UNKNOWN_ERROR) {
      alert('サーバーエラーが発生しました。再度やり直してください。');
    } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
      alert(
        '見つかりませんでした。検索キーワードに誤字や脱字がないかご確認ください。地名や郵便番号を追加してみてください。'
      );
    }
    return false;
  }
}

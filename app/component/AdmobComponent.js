import React from 'react';
import {View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const AdmobComponent = () => {
  return (
    <View pointerEvents="none">
      <BannerAd
        size={BannerAdSize.BANNER}
        unitId="ca-app-pub-2295278278800774/3527202265"
        // unitId={TestIds.BANNER}
      />
    </View>
  );
};

export default AdmobComponent;

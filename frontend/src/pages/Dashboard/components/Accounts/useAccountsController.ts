import { useMemo, useState } from 'react';
import Swiper from 'swiper';

import { useBankAccounts } from '../../../../hooks/useBankAccounts';
import { useDashboard } from '../../../../hooks/useDashboard';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const windowWidth = useWindowWidth();

  const { toggleValuesVisibility, areValuesVisible, openNewAccountModal } =
    useDashboard();

  function handleSlideChange(swiper: Swiper) {
    setSliderState({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  }

  const { accounts, isFetching } = useBankAccounts();

  const totalCurrentBalance = useMemo(() => {
    return accounts.reduce(
      (total, { currentBalance }) => total + currentBalance,
      0,
    );
  }, [accounts]);

  return {
    sliderState,
    windowWidth,
    areValuesVisible,
    isLoading: isFetching,
    accounts,
    totalCurrentBalance,
    setSliderState,
    handleSlideChange,
    toggleValuesVisibility,
    openNewAccountModal,
  };
}

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import emptyStateImg from '../../../../assets/empty-state.svg';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { Spinner } from '../../../../components/Spinner';
import { MONTHS } from '../../../../config/constants';
import { cn } from '../../../../utils/cn';
import { currencyFormatter } from '../../../../utils/currencyFormatter';
import { dateFormatter } from '../../../../utils/dateFormatter';
import { EditTransactionModal } from '../../modals/EditTransactionModal';

import { FiltersModal } from './FiltersModal';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import { useTransactionsController } from './useTransactionsController';

export function Transactions() {
  const {
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleIndexChange,
    handleChangeFilters,
    handleApplyFilters,
    handleCloseEditModal,
    handleOpenEditModal,
    slideState: { isBeginning, isEnd },
    isFiltersModalOpen,
    areValuesVisible,
    isLoading,
    isInitialLoading,
    transactions,
    filters,
    isEditModalOpen,
    transactionBeingEdited,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-gray-100 p-10">
      {isInitialLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="size-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button
                type="button"
                aria-label="Filtrar"
                onClick={handleOpenFiltersModal}
              >
                <FilterIcon />
              </button>
            </div>

            <div className="relative mt-6">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={new Date().getMonth()}
                onRealIndexChange={handleIndexChange}
                onSlideChange={({ realIndex }) => {
                  handleChangeFilters('month')(realIndex);
                }}
              >
                <SliderNavigation isBeginning={isBeginning} isEnd={isEnd} />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <section className="mt-4 flex-1 space-y-2 overflow-y-auto ">
            {isLoading && (
              <div className="flex h-full flex-col items-center justify-center">
                <Spinner className="size-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <img src={emptyStateImg} alt="Lista vazia" />
                <span className="text-center text-gray-700">
                  Não encontramos nenhuma transação!
                </span>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    onClose={handleCloseEditModal}
                    open={isEditModalOpen}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4"
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className="flex flex-1 gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === 'INCOME' ? 'income' : 'expense'
                        }
                        category={transaction.category?.icon}
                      />

                      <div className="flex flex-col">
                        <strong className="text-gray-800">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {dateFormatter(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'font-medium',
                        transaction.type === 'INCOME'
                          ? 'text-green-800'
                          : 'text-red-800',
                        !areValuesVisible && 'blur-md',
                      )}
                    >
                      {transaction.type === 'INCOME' ? '+ ' : '- '}
                      {currencyFormatter.format(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}

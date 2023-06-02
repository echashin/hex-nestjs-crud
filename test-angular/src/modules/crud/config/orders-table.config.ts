import { OrderEntity, OrderStatusEnum } from '../../../api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../locale/configs/date-time-formats.config';
import { DEFAULT_CURRENCY_SYMBOL } from '../../locale/const/default-currency-symbol.const';
import { CrudColumn, EntityValue } from '../types/crud-column';
import { CrudFields } from '../types/crud-select.type';

export const IGNORE_ORDER_STATUSES: OrderStatusEnum[] = [OrderStatusEnum.REJECTED, OrderStatusEnum.REJECTED_BY_CUSTOMER];

export const ORDER_TABLE_FIELDS: CrudFields<OrderEntity> = [
  'orderNumber',
  'isActive',
  'grandTotal',
  'deliveryDate',
  'customerId',
  'create_date',
  'orderQuantityRequested',
  'orderQuantityFound',
  'orderStatus',
  'storeId',
  'deliveryDistance',
  'actualOrderWeight',
  'isAlcohol',
  'payDate',
  'deliveryDateTimeFrom',
  'deliveryDateTimeTo',
  'tags',
  'hasReplacement',
  'replacementCounter',
  'completeTime',
];
export const ORDERS_TABLE_JOIN: string[] = [
  'store||name_i18n',
  'store.currency||symbol',
  'store.region||name_i18n',
  'orderTransactions||currencyCode',
  'orderBillingAddress||firstName,lastName',
  'orderVoucher||orderItemsDiscount,deliveryFeeDiscount',
];

export const ORDERS_TABLE_COLUMNS: CrudColumn<OrderEntity>[] = [
  {
    label: 'Order ID',
    isSortable: true,
    sortBy: 'orderNumber',
    font: 'roboto-mono',
    fixedLeft: true,
    type: 'link',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item.orderNumber;
      },
      link(item: OrderEntity): string {
        return `/orders/all/detail/${item.id}`;
      },
    },
  },
  {
    label: 'Customer',
    isSortable: true,
    sortBy: 'orderBillingAddress.firstName,orderBillingAddress.lastName',
    type: 'link',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return `${item.orderBillingAddress?.firstName} ${item.orderBillingAddress?.lastName}`;
      },
      link(item: OrderEntity): string {
        return `/users/customers/details/${item.customerId}`;
      },
    },
  },
  {
    label: 'Store',
    isSortable: false,
    type: 'link',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item?.store?.name_i18n;
      },
      link(item: OrderEntity): string {
        return `/store/stores/${item.storeId}/basic-information`;
      },
    },
  },

  {
    label: 'Store Region',
    isSortable: false,
    type: 'text',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item?.store?.region?.name_i18n;
      },
    },
  },

  {
    label: 'Status',
    isSortable: true,
    sortBy: 'orderStatus',
    type: 'text',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item.orderStatus;
      },
    },
  },
  {
    label: 'Tags',
    isSortable: false,
    type: 'tags',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item.tags ?? [];
      },
    },
  },
  {
    label: 'Replacement Count',
    isSortable: true,
    sortBy: 'replacementCounter',
    type: 'text',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item.replacementCounter;
      },
    },
  },
  {
    label: 'Replacement',
    isSortable: false,
    type: 'boolean',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item.hasReplacement;
      },
      boolean: {
        falseText: 'No',
        trueText: 'Yes',
      },
    },
  },
  {
    label: 'Date Submit',
    isSortable: true,
    sortBy: 'payDate',
    type: 'date',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item?.payDate;
      },
      dateFormat: DATE_TIME_FORMAT,
    },
  },
  {
    label: 'Expected Delivery Start',
    isSortable: true,
    sortBy: 'deliveryDateTimeFrom',
    type: 'date',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item.deliveryDateTimeFrom;
      },
      dateFormat: DATE_TIME_FORMAT,
    },
  },
  {
    label: 'Expected Delivery End',
    isSortable: true,
    sortBy: 'deliveryDateTimeTo',
    type: 'date',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item.deliveryDateTimeTo;
      },
      dateFormat: DATE_TIME_FORMAT,
    },
  },
  {
    label: 'Order Completed',
    isSortable: true,
    sortBy: '',
    type: 'date',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item.completeTime;
      },
      dateFormat: DATE_TIME_FORMAT,
    },
  },
  {
    label: 'Distance',
    isSortable: true,
    sortBy: 'deliveryDistance',
    align: 'right',
    type: 'text',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return `${((item.deliveryDistance ?? 0) / 1000).toFixed(2)} km`;
      },
    },
  },
  {
    label: 'Actual weight',
    isSortable: true,
    sortBy: 'actualOrderWeight',
    align: 'right',
    type: 'text',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item.actualOrderWeight ? `${(item.actualOrderWeight / 1000).toFixed(2)} kg` : '---';
      },
    },
  },
  {
    label: 'Ordered Items',
    isSortable: true,
    sortBy: 'orderQuantityRequested',
    align: 'right',
    type: 'text',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item.orderQuantityRequested;
      },
    },
  },
  {
    label: 'Found Items',
    isSortable: true,
    sortBy: 'orderQuantityFound',
    align: 'right',
    type: 'text',
    settings: {
      getField(item: OrderEntity): EntityValue {
        return item?.orderQuantityFound;
      },
    },
  },
  {
    label: 'Grand Total Price',
    isSortable: true,
    sortBy: 'grandTotal',
    align: 'right',
    type: 'text',
    settings: {
      /**
       * @description referenced at mapOrderEntityToDto method in backend order.service.ts
       */
      getField(item: OrderEntity): EntityValue {
        const itemsDiscount: number = item.orderVoucher?.orderItemsDiscount ?? 0;
        const deliveryFeeDiscount: number = item.orderVoucher?.deliveryFeeDiscount ?? 0;

        const allDiscount: number = itemsDiscount + deliveryFeeDiscount;
        const subTotalDiscounted: number = (item.grandTotal ?? 0) - allDiscount;

        return `${subTotalDiscounted.toFixed(2)} ${item.store?.currency?.symbol ?? DEFAULT_CURRENCY_SYMBOL}`;
      },
    },
  },
];

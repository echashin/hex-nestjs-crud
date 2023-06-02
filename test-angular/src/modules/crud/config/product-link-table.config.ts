import { ProductLinkEntity } from '../../../api/auth/data-contracts';
import { CrudColumn, EntityValue } from '../types/crud-column';
import { CrudFields } from '../types/crud-select.type';

export const ProductLinkTableColumns: (link?: string) => CrudColumn<ProductLinkEntity>[] = (link?: string) => [
  {
    label: '',
    isSortable: false,
    type: 'image',
    settings: {
      getField(item: ProductLinkEntity): EntityValue {
        return item?.product?.images?.[0] ? item.product?.images?.[0].url : '';
      },
    },
  },
  {
    label: 'Name',
    isSortable: false,
    type: 'link',
    settings: {
      getField(item: ProductLinkEntity): EntityValue {
        return `${item.product?.name_i18n} \n Barcode (EAN) ${item.product?.ean}`;
      },
      link(item: ProductLinkEntity): string {
        if (link) {
          return link;
        }
        return `./${item.id}`;
      },
    },
  },
  {
    label: 'Brand',
    isSortable: false,
    type: 'text',
    settings: {
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.productBrand?.name_i18n;
      },
    },
  },
  {
    label: 'Category',
    isSortable: false,
    type: 'text',
    settings: {
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.category?.name_i18n ?? '';
      },
    },
  },
  {
    label: 'Sub-category',
    isSortable: false,
    type: 'text',
    settings: {
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.subcategory?.name_i18n;
      },
    },
  },
  {
    label: 'Measurement',
    isSortable: false,
    type: 'text',
    settings: {
      getField(item: ProductLinkEntity): EntityValue {
        return [item.product?.productMeasurement, `${item.product?.productUnit?.name_i18n}`].join('/');
      },
    },
  },
  {
    label: 'Status',
    isSortable: true,
    sortBy: 'product.isActive',
    type: 'boolean',
    settings: {
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.isActive;
      },
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  },
];

export const PRODUCT_LINK_TABLE_JOIN: string[] = [
  'product||name_i18n,ean,productMeasurement,imageUrls,isActive',
  'product.productBrand||name_i18n',
  'product.subcategory||name_i18n',
  'product.category||name_i18n',
  'product.productUnit||name_i18n',
];

export const PRODUCT_LINK_TABLE_FIELDS: CrudFields<ProductLinkEntity> = ['storeId', 'id'];

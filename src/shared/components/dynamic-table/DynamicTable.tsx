import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '@hooks/useDebouceTime';
import { Input, Table } from 'antd';
import { ChangeEvent, FC, useMemo, useState } from 'react';

interface DynamicTableProps {
  cols: any;
  dataSource: any[];
  isShowSearch?: boolean;
  searchBy?: string[];
  pageSize?: number;
  rowKey?: string;
}

const DynamicTable: FC<DynamicTableProps> = ({
  cols = [],
  pageSize = 9,
  searchBy = [],
  dataSource = [],
  isShowSearch = false,
  rowKey = 'id',
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  // Construct database
  const displayDataSource = useMemo(() => {
    if (!searchValue.trim() || !searchBy.length || !isShowSearch) {
      return dataSource;
    }
    const regex = new RegExp(searchValue.trim(), 'i');
    const filteredDataSource = dataSource.filter((item) => {
      return searchBy.some((key) => {
        const value = item[key];
        return typeof value === 'string' && value.match(regex);
      });
    });

    return filteredDataSource;
  }, [debouncedSearchValue, dataSource]);

  return (
    <>
      {isShowSearch && (
        <Input
          placeholder='Search'
          size='large'
          prefix={<SearchOutlined />}
          onChange={handleSearchChange}
        />
      )}
      <div className='py-2'>
        <Table
          rowKey={rowKey}
          columns={cols}
          dataSource={displayDataSource}
          pagination={{ position: ['bottomRight'], pageSize }}
          bordered
        />
      </div>
    </>
  );
};

export default DynamicTable;

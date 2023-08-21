import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '@hooks/useDebouceTime';
import { Input, Table } from 'antd';
import { ChangeEvent, FC, memo, useMemo, useState } from 'react';

interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
}

interface DynamicTableProps {
  cols: TableColumn[];
  dataSource: any[];
  isShowSearch?: boolean;
  searchBy?: string[];
  pageSize?: number;
}

const DynamicTable: FC<DynamicTableProps> = ({
  cols = [],
  pageSize = 10,
  searchBy = [],
  dataSource = [],
  isShowSearch = false,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  // Construct column configs
  const displayColumns = useMemo(() => {
    return cols;
  }, []);

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
  }, [debouncedSearchValue]);

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
          columns={displayColumns}
          dataSource={displayDataSource}
          pagination={{ position: ['bottomRight'], pageSize }}
        />
      </div>
    </>
  );
};

export default memo(DynamicTable);

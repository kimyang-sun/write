import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  AutoSizer,
} from 'react-virtualized';

let cache = new CellMeasurerCache({
  defaultWidth: 100,
  fixedWidth: true,
});

export const rowRenderer = () => {
  return (
    <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    ></CellMeasurer>
  );
};

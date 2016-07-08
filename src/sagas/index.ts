import searchSaga from './search';

export default function* rootSaga(): IterableIterator<any> {
  yield [
    searchSaga(),
  ];
}

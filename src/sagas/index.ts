import definitionSaga from './definition';
import searchSaga from './search';

export default function* rootSaga(): IterableIterator<any> {
  yield [
    definitionSaga(),
    searchSaga(),
  ];
}

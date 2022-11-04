import '../styles/globals.scss';
import Nav from '../Components/Nav';
import ConfirmDeleteModal from '../Components/ConfirmDeleteModal';
import ListModal from '../Components/ListModal';
import ConfirmDeleteTodoModal from '../Components/ConfirmDeleteTodoModal';
import { currentDelete, listModal, deleteTodoModal } from '../store';

function MyApp({ Component, pageProps }) {
  const enableModal = currentDelete((state) => state.enableModal);
  const enableListModal = listModal((state) => state.enableListModal);
  const enableTodoModal = deleteTodoModal((state) => state.enableModal);
  return (
    <>
      <Nav />
      {enableModal ? <ConfirmDeleteModal /> : ''}
      {enableListModal ? <ListModal /> : ''}
      {enableTodoModal ? <ConfirmDeleteTodoModal /> : ''}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

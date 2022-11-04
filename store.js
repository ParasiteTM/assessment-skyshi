import create from 'zustand';

export const activityStore = create((set) => ({
  activity: [],
  setActivity: (data) =>
    set(() => ({
      activity: data,
    })),
  addNewActivity: (data) => {
    set((state) => ({
      activity: [...state.activity, data],
    }));
  },
  deleteActivity: (id) => {
    set((state) => ({
      activity: state.activity.filter((item) => item.id !== id),
    }));
  },
  getSpecificActivity: (id) => {
    set((state) => {
      let x = state.activity.filter((item) => item.id == id);
      return x[0];
    });
  },
}));

export const currentDelete = create((set) => ({
  enableModal: false,
  currentDeleteTarget: {},
  setCurrentDeleteTarget: (target) => {
    set(() => ({
      currentDeleteTarget: target,
    }));
  },
  disableModal: () => {
    set(() => ({
      enableModal: false,
    }));
  },
  activateModal: () => {
    set(() => ({
      enableModal: true,
    }));
  },
}));

export const currentList = create((set) => ({
  currentListInfo: {},
  showListImagePlaceholder: true,
  filterToDoId: null,
  setShowListImagePlacehodler: () => {
    set(() => ({
      showListImagePlaceholder: false,
    }));
  },
  setCurrentListInfo: (list) => {
    set(() => ({
      currentListInfo: list,
    }));
  },
  setFilterToDoId: (id) => {
    set(() => ({
      filterToDoId: id,
    }));
  },
  setCurrentListTitle: (newTitle) => {
    set((state) => ({
      currentListInfo: {
        id: state.currentListInfo.id,
        title: newTitle,
        created_at: state.currentListInfo.created_at,
        todo_items: state.currentListInfo.todo_items,
      },
    }));
  },
  deleteTodo: () => {
    set((state) => {
      let filterTodoItems = state.currentListInfo.todo_items.filter(
        (x) => x.id !== state.filterToDoId
      );
      return {
        currentListInfo: {
          id: state.currentListInfo.id,
          title: state.currentListInfo.title,
          created_at: state.currentListInfo.created_at,
          todo_items: filterTodoItems,
        },
      };
    });
  },
  addNewTodo: (newTodo) => {
    set((state) => {
      let x = {
        currentListInfo: {
          id: state.currentListInfo.id,
          title: state.currentListInfo.title,
          created_at: state.currentListInfo.created_at,
          todo_items: state.currentListInfo.todo_items,
        },
      };
      x.currentListInfo.todo_items.push(newTodo);

      return x;
    });
  },
  handleSort: (sortMode) => {
    set((state) => {
      let base = state.currentListInfo.todo_items;
      console.log(base, sortMode);
      switch (sortMode) {
        case 'terbaru':
          base.sort((a, b) => b.id - a.id);
          break;
        case 'terlama':
          base.sort((a, b) => a.id - b.id);
          break;
        case 'a-z':
          base.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'z-a':
          base.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'belum':
          base.sort((a, b) => a.is_active - b.is_active);
          break;
      }

      return {
        currentListInfo: {
          id: state.currentListInfo.id,
          title: state.currentListInfo.title,
          created_at: state.currentListInfo.created_at,
          todo_items: base,
        },
      };
    });
  },
}));

export const listModal = create((set) => ({
  enableListModal: false,
  disableListModal: () => {
    set(() => ({
      enableListModal: false,
    }));
  },
  activateListModal: () => {
    set(() => ({
      enableListModal: true,
    }));
  },
}));

export const deleteTodoModal = create((set) => ({
  enableModal: false,
  deleteTarget: null,
  disableTodoModal: () => {
    set(() => ({
      enableModal: false,
    }));
  },
  enableTodoModal: () => {
    set(() => ({
      enableModal: true,
    }));
  },
  setDeleteTarget: (target) => {
    set(() => ({
      deleteTarget: target,
    }));
  },
}));

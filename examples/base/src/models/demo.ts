import { ModelDefault, Dispatch } from '@uiw-admin/models';
import { selectById } from '../servers/demo'

const demo: ModelDefault = {
  name: "demo",
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    isView: false
  },
  reducers: {
    updateState: (state: any, payload: any) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: any) => ({
    async selectById(payload: any) {
      const dph = dispatch as Dispatch;
      const data = await selectById(payload);
      if (data.code === 200) {
        dph.demo.updateState({
          drawerVisible: true,
          queryInfo: data.data || {},
        });
      }
    },
    clean() {
      const dph = dispatch as Dispatch;
      dph.demo.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false
      });
    }
  }),
};

export default demo
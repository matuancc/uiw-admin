import React, { useMemo } from 'react';
import {
  Button,
  Input,
  Form,
  Row,
  Col,
  Checkbox,
  Switch,
  Textarea,
  DateInput,
  TimePicker,
  MonthPicker,
  FormSubmitProps,
  SearchSelect,
} from 'uiw';
import Select from './widgets/Select';
import FormRadio from './widgets/Radio';
import { useStore } from './hooks';
import { BaseFormProps, Fields } from './types'


const widgets = {
  input: Input,
  radio: FormRadio,
  checkbox: Checkbox,
  switch: Switch,
  select: Select,
  searchSelect: SearchSelect,
  textarea: Textarea,
  dateInput: DateInput,
  timePicker: TimePicker,
  monthPicker: MonthPicker,
};

const BaseForm: React.FC<BaseFormProps> = (props) => {
  const store = useStore();

  let { updateStore, reset, onSearch } = store as any;

  const { columns } = props;
  // 获取表单配置
  const getFormFields = useMemo(() => {
    const fields: Fields = {};
    columns.forEach((col) => {
      if (col.props && Object.keys(col.props).length > 0) {
        const { widgetProps, key, widget, label, initialValue, ...otherProps } =
          col.props;
        const name = key || col.key;
        const Widget = widgets[widget];
        fields[name] = {
          label: label || col.title,
          children: <Widget {...widgetProps} />,
          ...otherProps,
          initialValue,
        };
      }
    });

    return fields;
  }, [JSON.stringify(columns)]);

  // 查询
  const onFormSearch = ({ initial, current }: FormSubmitProps) => {
    updateStore({
      searchValues: {
        ...initial,
        ...current,
      },
    });
    onSearch(current);
  };

  // 重置

  // const onReset = (resetForm: () => void) => {
  //   resetForm();
  // };
  const itemsLength = Object.keys(getFormFields).length;
  const emptyLength = 4 - itemsLength % 5
  return (
    <Form
      style={{ background: '#fff', paddingBottom: 10, marginBottom: 14 }}
      resetOnSubmit={false}
      onSubmit={({ initial, current }) => {
        onFormSearch({ initial, current });
      }}
      onSubmitError={(error) => {
        if (error.filed) {
          return { ...error.filed };
        }
        return null;
      }}
      fields={getFormFields}
    >
      {({ fields, state, canSubmit, resetForm }) => {
        return (
          <div>
            <Row gutter={12}>
              {Object.keys(fields).map((key) => (
                <Col key={key} fixed style={{ width: '20%' }}>
                  {fields[key]}
                </Col>
              ))}
              {Array(emptyLength).fill('').map((value, index) => (
                <Col key={index} fixed style={{ width: '20%' }} />
              ))}
              <Col align="middle">
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                {/* <Button type="warning" onClick={() => onReset(resetForm)}>
           重置表单
         </Button> */}
              </Col>
            </Row>
          </div>
        );
      }}
    </Form>
  );
};

export default BaseForm;

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)

# @asurraa/sura-ui-input-money

> AsurRaa input money payment Modal.
> This modal come built in with either USD or KHR.

## Installation

```sh
yarn add @asurraa/sura-ui-input-money
```

## Example

```tsx
const ExpensePage = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editableData, setEditableData] =
    useState<ExpenseServicesType | null>();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ resolver: classExpenseSchema });

  return (
    <Fragment>
      <AsurRaaModal
        isSubmitLoading={isSubmitting}
        title={isEditableDataNull ? "Create Expense" : "Edit Expense"}
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={handleSubmit(onSubmit)}
      >
        <form>
          <SuraController
            titleHeader={t("Amount")}
            name="amount"
            control={control}
            errors={errors}
            defaultValue={editableData === null ? "" : editableData?.amount}
            render={({ field: { onChange, value } }) => (
              <div>
                <AsurRaaInputMoney
                  disabled={editableData === null ? false : true}
                  style={{ width: "100%" }}
                  onChange={onChange}
                  value={value}
                />
              </div>
            )}
          />
        </form>
      </AsurRaaModal>
      //* other JSX Components
    </Fragment>
  );
};

export default ExpensePage;
```

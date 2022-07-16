# Sura CRUD Components

# How to install

With NPM

```bash
npm i -D @asurraa/sura-ui-crud-table-component
```

````

With yarn

```bash
yarn add @asurraa/sura-ui-crud-table-component
````

## Example

```tsx
import { AsurRaaText } from "@asurraa/sura-ui-text";

const Example = () => {
  return (
    <div>
      <TableCrudComponent
        fetcher={useProductCategoryServices}
        cbEditableData={(data) => {
          setEditableData(data);
        }}
        cbOpenModalState={(status) => {
          setOpenCreateModal(status);
        }}
        cbResetFormState={() => {
          reset();
        }}
        cbSearchStateValue={(value) => {
          setSearch(value);
        }}
        refreshTableState={refreshState}
        renderAnotherChildrenOnRightSideProps={
          <div>
            <Select
              style={{ width: 180 }}
              onSelect={(value) => {
                setPage(1);
                // setProductId(value);
                //* put the useState value in the paramState
              }}
              showSearch={false}
              allowClear={false}
              defaultValue={""}
            >
              <Select.Option key={""} value={""}>
                {t("Filter by Product")}
              </Select.Option>
              {filterBusinessTypeOptionsArrayConstant?.map((question) => (
                <Select.Option key={question.key} value={question.value}>
                  {t(question.name)}
                </Select.Option>
              ))}
            </Select>
          </div>
        }
        renderMoreActionButtonProps={(propsData) => {
          return [
            {
              key: uid(),
              label: (
                <div>
                  <Button
                    type="text"
                    onClick={() => {
                      Logger.log("clicked", propsData);
                    }}
                    icon={<ToolOutlined />}
                  >
                    {t("Clicked")}
                  </Button>
                </div>
              ),
            },
          ];
        }}
        detailButtonRoute={`${ROUTE_PATH.PRODUCT}/${editableData?.id}`}
        paramState={`&search[name]=${search}&search[description]=${search}`}
        exportCSVName={t("Product Category")}
        scrollToFirstRowOnChangeState={true}
        tableColumn={column}
        hideDetailButton={false}
      />
    </div>
  );
};
```

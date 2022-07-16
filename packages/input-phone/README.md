[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)

# @asurraa/sura-ui-input-phone

> Sura UI Input Phone Number Component

Use to input a number with the mouse and keyboard and usually use under AsurRaaModal Components. See more detail about the modal [here](https://github.com/asurraa/sura-ui/tree/master/packages/modal).

**A numberic value is required**

```sh
yarn add @asurraa/sura-ui-input-phone
```

## Example

```tsx
import { Logger } from "@asurraa/sura-ui-utilities";
// Logger
const ModalWrapper = (
    <Fragment>
      <AsurRaaModal
        title={
          isEditableNull
            ? `${t("Create Appointments")}`
            : `${t("Edit Appointments")}`
        }
        visible={openModal}
        isSubmitLoading={isSubmitting}
        onCancel={() => {
          setOpenModal(false);
          setEditableData(undefined);
          reset();
        }}
        onOk={handleSubmit(onSubmit)}
      >
      //* other controllers

          <Controller
            name="phone"
            control={createCustomerControl}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <div>
                <InputHeader>Phone Number</InputHeader>
                <AsurRaaMiniPhoneInput onChange={onChange} value={value} />
              </div>
            )}
          />

          <div style={{ marginTop: 20 }} />
        </form>
      </AsurRaaModal>
    </Fragment>
  );

  return (
    <Fragment>
      {ModalWrapper}
      // other jsx components

    </Fragment>
  )

```

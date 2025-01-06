import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();

  // react-hook-form
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  console.log(errors);

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Новый домик успешно создан");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow2>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Это поле обязательно для заполнения",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow2>

      <FormRow label="Cabin" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>

      <FormRow2>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Это поле обязательно для заполнения",
            min: {
              value: 1,
              message: "Вместимость должна быть не менее одной",
            },
          })}
        />
      </FormRow2>

      <FormRow2>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow2>

      <FormRow2>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Это поле обязательно для заполнения",
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Скидка должна быть меньше обычной цены",
          })}
        />
      </FormRow2>

      <FormRow2>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow2>

      <FormRow2>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow2>

      <FormRow2>
        {/* type - это атрибут HTML! */}
        <Button variation="secondary" type="reset">
          Отменить
        </Button>
        <Button disabled={isCreating}>Добавить домик</Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;

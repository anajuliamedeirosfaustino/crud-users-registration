import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit && ref.current) {
      const user = ref.current;
      user.name.value = onEdit.name || "";
      user.email.value = onEdit.email || "";
      user.phone.value = onEdit.phone || "";
      user.birth_date.value = onEdit.birth_date || "";
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!user) return console.warn("Ref do formulário não encontrado!");

    if (
      !user.name.value ||
      !user.email.value ||
      !user.phone.value ||
      !user.birth_date.value
    ) {
      return console.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          name: user.name.value,
          email: user.email.value,
          phone: user.phone.value,
          birth_date: user.birth_date.value,
        })
        .then(({ data }) => console.log(data)) 
        .catch(({ data }) => console.error(data)); 
    } else {
      await axios
        .post("http://localhost:8800", {
          name: user.name.value,
          email: user.email.value,
          phone: user.phone.value,
          birth_date: user.birth_date.value,
        })
        .then(({ data }) => console.log(data)) 
        .catch(({ data }) => console.error(data));
    }

    user.name.value = "";
    user.email.value = "";
    user.phone.value = "";
    user.birth_date.value = "";

    setOnEdit(null);
    getUsers(); 
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Name</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telephone</Label>
        <Input name="phone" />
      </InputArea>
      <InputArea>
        <Label>Date of birth</Label>
        <Input name="birth_date" type="date" />
      </InputArea>

      <Button type="submit">Save</Button>
    </FormContainer>
  );
};

export default Form;

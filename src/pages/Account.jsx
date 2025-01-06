import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Обновить учетную запись</Heading>

      <Row>
        <Heading as="h3">Обновление пользовательских данных</Heading>
        <p>Форма обновления пользовательских данных</p>
      </Row>

      <Row>
        <Heading as="h3">Обновить пароль</Heading>
        <p>Форма обновления пароля пользователя</p>
      </Row>
    </>
  );
}

export default Account;

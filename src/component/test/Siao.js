import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
function Siao() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>ข้าพระพุทธเจ้า</Form.Label>
        <Form.Control type="text" placeholder="นาย ภคิน เนียมสอน(ตัวอย่าง)" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>คำถวายพระพร</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          placeholder="ขอให้พระองค์ทรงพระเจริญยิ่งยืนนาน"
          rows={3}
        />
        <Button variant="warning">ลงนามถวายพระพร</Button>{" "}
      </Form.Group>
      <img src="https://media.discordapp.net/attachments/730400715109040158/1093130534705713203/3uzu4a.png?width=721&height=662" />
    </Form>
  );
}

export default Siao;

<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["name"]);
    $phone = test_input($_POST["phone"]);
    $email = test_input($_POST["email"]);
    $question = test_input($_POST["question"]);

    $request = [
        'to' => ["<vlasov.31189@gmail.com>"],
        "sender" => "<noreply@tarotacademy.ru>",
        'subject' => 'Заявка с сайта Академия Таро',
        'html_body' => 'Имя клиента: ' . $name . '<br>'
            . 'Телефон: ' . $phone . '<br>'
            . 'Email: ' . $email . '<br>'
            . 'Вопрос: ' . $question . '<br>'
    ];

    $newMessage = new Message();

    $newMessage->sendMail($request);
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


Class Message
{
    protected $api_key = 'api-723B280ED37211E8AD70F23C91BBF4A0';

    public function sendMail($request)
    {
        $request['api_key'] = $this -> api_key;

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json"
        ));
        curl_setopt($curl, CURLOPT_URL,
            "https://api.smtp2go.com/v3/email/send"
        );
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($request));
        curl_exec($curl);

        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        if ($httpcode == 200) {
            $response = 'Ваше сообщение успешно отправлено';
        } else {
            $response = 'Ошибка отправки сообщение, попробуйте снова';
        }
        echo json_encode($response);
    }
}

?>
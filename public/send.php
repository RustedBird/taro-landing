<?php

$api_key = '7bf1421a5f6dca7f24991ee1261b0653-us19';
$list_id = '456cc3fb35';

$url = 'https://us5.api.mailchimp.com/3.0/lists/' . $list_id . '/members/';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["name"]);
    $phone = test_input($_POST["phone"]);
    $email = test_input($_POST["email"]);
    $question = test_input($_POST["question"]);
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


$result = [
    'status' => false,
    'message' => 'возникли ошибки, попробуйте снова'
];

$auth = base64_encode( 'user:'. $api_key );

$data = array(
    'apikey'        => $api_key,
    'email_address' => $email,
    'status'        => 'subscribed',
    'merge_fields'  => array(
        'NAME' => $name,
        'PHONE' => $phone,
        'QUESTION' => $question

    )
);

$json_data = json_encode($data);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://us19.api.mailchimp.com/3.0/lists/'.$list_id.'/members/');
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json',
    'Authorization: Basic '.$auth));
curl_setopt($ch, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
curl_exec($ch);

$results = [
    'status' => false,
    'message' => 'Возникла ошибка, пожалуйста, попробуйте снова'
];

$message = "<p>Имя: $name</p>
            <p>E-mail: $email</p>
            <p>Вопрос: $question</p>";

if (mail("vlasov.31189@gmail.com", "Заявка с сайта 'Академия Современного Таро'", $message)) {
    $results = [
        'status' => true,
        'message' => 'Ваше сообщение успешно отправлено'
    ];
}
echo json_encode($results);






















//if ($_SERVER["REQUEST_METHOD"] == "POST") {
//    $name = test_input($_POST["name"]);
//    $phone = test_input($_POST["phone"]);
//    $email = test_input($_POST["email"]);
//    $question = test_input($_POST["question"]);
//}
//
//function test_input($data) {
//    $data = trim($data);
//    $data = stripslashes($data);
//    $data = htmlspecialchars($data);
//    return $data;
//}
//
//if (mail("vlasov.31189@gmail.com", "Заявка с сайта", "Имя:" . $name . ". E-mail: " . $email . "Вопрос:" . $question, "From: example2@mail.ru \r\n")) {
//    return "сообщение успешно отправлено";
//} else {
//    return "при отправке сообщения возникли ошибки";
//}

?>
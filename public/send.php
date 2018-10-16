<?php

function send_mail($email, $subject, $msg)
{
    $api_key = "64c3e238d5164b1778696bb708704d0f-a3d67641-a3581e1f";/* Api Key got from https://mailgun.com/cp/my_account */
    $domain = "info.taroacademy.com";/* Domain Name you given to Mailgun */
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:' . $api_key);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v2/' . $domain . '/messages');
    curl_setopt($ch, CURLOPT_POSTFIELDS, array('from' => 'Taro Academy <mail@youriste.com>',
        'to' => $email,
        'subject' => $subject,
        'html' => $msg
    ));
    $results = curl_exec($ch);
    curl_close($ch);
    echo $results;
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["name"]);
    $phone = test_input($_POST["phone"]);
    $email = test_input($_POST["email"]);
    $question = test_input($_POST["question"]);

    $message = "<p>Имя: $name</p>
                <p>E-mail: $email</p>
                <p>Вопрос: $question</p>";

    send_mail("vlasov.31189@gmail.com", "Вопрос с сайта 'Академия Современного Таро'", $message);
}
?>
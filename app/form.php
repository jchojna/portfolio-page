<?php
  header("Content-Type: application/json");
  require 'PHPMailerAutoload.php';
  require_once dirname(__FILE__)."/../credentials/credentials.php";
  $mail = new PHPMailer;
  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
  // RESET VARIABLES
  $emptyEmailError = $invalidEmailError = $phoneError = $messageError = false;
  $userName = $userTitle = $userEmail = $userPhone = $userMessage = '';
  $submit = $success = $failure = false;
  // GET DATA AND ASSIGN VALUES TO VARIABLES
  $data = json_decode(file_get_contents('php://input'));
  $submit      = $data->submit;
  $userName    = $data->userName;
  $userTitle   = $data->userTitle;
  $userEmail   = $data->userEmail;
  $userPhone   = $data->userPhone;
  $userMessage = $data->userMessage;
  
  if(isset($submit)){

    // NAME VALIDATION
    if (empty($userName)) {
      $userName = "User";
    } else {
      $userName = test_input($userName);
    }
    // TITLE VALIDATION
    if (empty($userTitle)) {
      $userTitle = "Inquiry";
    } else {
      $userTitle = test_input($userTitle);
    }
    // E-MAIL VALIDATION
    if (empty($userEmail)) {
      $emptyEmailError = true;
    } else {
      $userEmail = test_input($userEmail);
      if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
        $invalidEmailError = true;
      }
    }
    // PHONE VALIDATION
    if (empty($userPhone)) {
      $userPhone = "Not specified";
    } else {
      $userPhone = test_input($userPhone);
      if ( !preg_match("/^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{3}$/i", $userPhone) and $userPhone != "" ) {
        $phoneError = true;
      }
    }
    // DESCRIPTION VALIDATION
    if (empty($userMessage)) {
      $messageError = true;
    } else {
      $userMessage = test_input($userMessage);
    }

    // SENDING FORM
    if (
    $emptyEmailError == false and
    $invalidEmailError == false and
    $phoneError == false and
    $messageError == false
    ) {
      $mail->SMTPDebug = 0;
      $mail->isSMTP();
      $mail->Host = 's75.linuxpl.com';
      $mail->SMTPAuth = true;
      $mail->Username = EMAIL;
      $mail->Password = PASSWORD;
      $mail->SMTPSecure = 'tls';
      $mail->Port = 587;

      $mail->setFrom('info@jakubchojna.pl', 'Jakub');
      $mail->addAddress('info@jakubchojna.pl', $userName);
      //$mail->addReplyTo(EMAIL);
      //$mail->addCC('cc@example.com');
      //$mail->addBCC('bcc@example.com');
      // Add attachments
      //$mail->addAttachment('/var/tmp/file.tar.gz');
      // Optional name  
      //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');

      $body = '
      <p>Message sent from: <strong>' . $userEmail . '</strong></p>
      <p>Hello Jakub!</p>
      <p>My name is ' . $userName . '</p>
      <p>' . $userMessage . '</p>
      <p>My phone number is: ' . $userPhone . '</p>';

      $mail->isHTML(true);
      $mail->Subject = $userTitle;
      $mail->Body    = $body;
      $mail->AltBody = strip_tags($body);
      //$mail->send();
      $failure = $mail->ErrorInfo;
      $userName = $userTitle = $userEmail = $userPhone = $userMessage = "";

      if ($failure === false) $success = true;
    }
    $data = array(
      'emptyEmailError'=>$emptyEmailError,
      'invalidEmailError'=>$invalidEmailError,
      'phoneError'=>$phoneError,
      'messageError'=>$messageError,
      'success'=>$success,
      'failure'=>$failure
    );
    echo json_encode($data);
    exit;
  }
?>
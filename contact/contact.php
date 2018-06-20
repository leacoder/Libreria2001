<?php
/*
Credits: Bit Repository
URL: http://www.bitrepository.com/
*/

require 'PHPMailerAutoload.php';
require("phpmailer/class.phpmailer.php");
error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post)
{

$name = stripslashes($_POST['name']);
$email = trim($_POST['email']);
$subject = stripslashes($_POST['subject']);
$message = stripslashes($_POST['message']);


$error = '';


try {
    if(!$error){
    $mail = new PHPMailer(); 
    //Server settings
    //$mail->SMTPDebug = 4;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'mail.libreria2001.com.ar';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'contacto@libreria2001.com.ar';                 // SMTP username
    $mail->Password = 'Libreria14031963';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to
    //587 default
    //Recipients
    $mail->setFrom('contacto@libreria2001.com.ar');
	$mail->addAddress('libreria2001@hotmail.com');     // Add a recipient
    $mail->addReplyTo($email);
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    
    $user_Name        = $name;
    $user_Message     = $message;
    $message_Body = "<strong>Nombre: </strong>". $user_Name ."<br>";
    $message_Body .= "<strong>Email: </strong>". $email ."<br>";
    $message_Body .= "<strong>Asunto: </strong>". $subject ."<br>";

    $message_Body .= "<strong>Mensaje: </strong>". $user_Message ."<br>";
    
    $mail->Subject = $subject;
    $mail->Body    = $message_Body;
    $mail->AltBody = $message_Body;

    if($mail->send()) {

	// Email has sent successfully, echo a success page.

    echo 'OK';

    } else {
        echo 'ERROR!';
    }
}
} catch (Exception $e) {
    echo 'ERROR!';
}
}
?>
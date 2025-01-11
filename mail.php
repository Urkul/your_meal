<?php

$method = $_SERVER['REQUEST_METHOD'];
$c = true;

if ( $method === 'POST' ) {

	$name = trim($_POST["name"]);
	$phone = trim($_POST["phone"]);
	$format = trim($_POST["format"]);
	$address = trim($_POST["address"]);
	$floor = trim($_POST["floor"]);
	$intercom = trim($_POST["intercom"]);
	$order = trim($_POST["order"]);


	// $email_to = "v.slsrnk@gmail.com";

	foreach ( $_POST as $key => $value ) {
		$txt .= "<b>" . $key . "</b> " . $value . "%0A";
	}
} else if ( $method === 'GET' ) {

	$name = trim($_GET["name"]);
	$phone = trim($_GET["phone"]);
	$format = trim($_GET["format"]);
	$address = trim($_GET["address"]);
	$floor = trim($_GET["floor"]);
	$intercom = trim($_GET["intercom"]);
	$order = trim($_GET["order"]);

	foreach ( $_GET as $key => $value ) {
		$txt .= "<b>" . $key . "</b> " . $value . "%0A";
	}
};


$token = "7927693823:AAF-zccxcGgq5rGnyY_7jMFKef7KFmccM9E"; // токен телеграмм бот
$chat_id = "-4620302335"; // id группы в телеграмм
// сообщение в телеграмм
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");


<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
require 'includes/config.php';
require 'includes/telstra.php';

$telstra = new telstra($config);

if ($_POST['mobile']) {
    $prov = $telstra->provision();

    if (!empty($prov)) {
        $result = $telstra->sendsms([
    'to' => $_POST['mobile'],
    'body' => $_POST['body'],
    'from' => 'A new anonymous friend',
    'validity' => 1,
    'scheduledDelivery' => 1,
    'notifyURL' => '',
    'replyRequest' => false,
  ]);

        foreach ($result['messages'] as $sms) {
            if ('MessageWaiting' == $sms['deliveryStatus']) {
                echo $sms['to'].' has been sent and is waiting in queue.';
            } else {
                echo 'Send Failed';
                echo '<pre>'.print_r($sms).'</pre>';
            }
        }
    }
} else {
    echo "Mobile number not set, <a href='./'>To go back</a>";
}

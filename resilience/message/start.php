<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
require 'includes/config.php';
require 'includes/telstra.php';

$bnumoptions = ['bnum' => [
 '+61435128190',
 '+61416932514',
 '+61400198449',
 '+61406942131',
 '+61434724363',
 ],
 ];

$telstra = new telstra($config);
$bnumcheck = $telstra->bnumreg($bnumoptions);
if ($_POST['mobile']) {
    $prov = $telstra->provision();
    if (!empty($prov)) {
        $result = $telstra->sendsms([
 'to' => '+61400198449',
 'body' => $_POST['body'],
 'from' => $_POST['mobile'],
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

<?php
  require_once __DIR__ . '/../autoload.php';

  //use Qiniu\Auth;

  // 用于签名的公钥和私钥. http://developer.qiniu.com/docs/v6/api/overview/security.html#aksk
  $accessKey = 'g_eUKd-mA162pkoIIzdMBwwPGeKMZo3iRsFWlWy2';
  $secretKey = 'Oew6tHOUZO3hBivwWXyQkUtJ2j4V_E5pCIz3GNxL';
  $auth = new Auth($accessKey, $secretKey);

  // 空间名  http://developer.qiniu.com/docs/v6/api/overview/concepts.html#bucket
  $bucket = 'yonsen';

  // 生成上传Token
  $token = $auth->uploadToken($bucket);

  echo $token;
?>
<?php

$ds = "/"; 

$storeFolder = 'uploads'; 



if (!empty($_FILES)) {
    
    foreach($_FILES['file']['tmp_name'] as $key => $value) {
        $tempFile = $_FILES['file']['tmp_name'][$key];
        $targetFile =  $storeFolder. $_FILES['file']['name'][$key];
        move_uploaded_file($tempFile,$targetFile);
    }
    
    
    
//    //extension du fihier d'origine
//    $ext = strtolower(pathinfo( $_FILES['file']['name'], PATHINFO_EXTENSION));
//     
//    $tempFile = $_FILES['file']['tmp_name'];          //3 
//   
//    //filtre pour les pdf
//    if ($ext == 'pdf' || TRUE) {
//
//        $targetPath = dirname(__FILE__) . $ds . $storeFolder . $ds;
//
//        $targetFile = $targetPath . $_FILES['file']['name'];
//
//        move_uploaded_file($tempFile, $targetFile); 
//    }
}
?>  
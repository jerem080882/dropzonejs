<?php

//post_max_size = 210M
//upload_max_filesize = 200M
//max_file_uploads = 20

$ds = "/"; 

//répertoire d'uploads
$storeFolder = 'uploads';
$pdfFolder = $storeFolder.$ds.'pdf';
$csvFolder = $storeFolder.$ds.'csv';
$xmlFolder = $storeFolder.$ds.'xml';
$bulkFolder = $storeFolder.$ds.'bulk';

if (!empty($_FILES)) {
    
    foreach($_FILES['file']['tmp_name'] as $key => $value) {
        //extension du fichier d'origine
        $ext = strtolower(pathinfo( $_FILES['file']['name'][$key], PATHINFO_EXTENSION));
        
        //fichier temporaire
        $tempFile = $_FILES['file']['tmp_name'][$key];
        
        //deplacement suivant l'extension
        if ($ext == 'pdf') {
            $targetFile =  dirname(__FILE__) . $ds .$pdfFolder.$ds.$_FILES['file']['name'][$key];
            move_uploaded_file($tempFile,$targetFile);
        } else if ($ext == 'csv' || $ext == 'xls') {
            $targetFile =  dirname(__FILE__) . $ds .$csvFolder.$ds.$_FILES['file']['name'][$key];
            move_uploaded_file($tempFile,$targetFile);
        } else if ($ext == 'xml') {
            $targetFile =  dirname(__FILE__) . $ds .$xmlFolder.$ds.$_FILES['file']['name'][$key];
            move_uploaded_file($tempFile,$targetFile);
        } else if ($ext == 'bulk') {
            $targetFile =  dirname(__FILE__) . $ds .$bulkFolder.$ds.$_FILES['file']['name'][$key];
            move_uploaded_file($tempFile,$targetFile);
        } else {
            $targetFile =  dirname(__FILE__) . $ds .$storeFolder.$ds.$_FILES['file']['name'][$key];
            move_uploaded_file($tempFile,$targetFile);
        }
    }
    
}
?>  
// save_reflection.php
<?php
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['filename']) && isset($data['content'])) {
    $filename = "../app/database/services/gospel/reflection/" . $data['filename'];
    $content = $data['content'];

    // Sanitize the filename to prevent directory traversal attacks
    $filename = basename($filename);
    
    file_put_contents($filename, $content);

    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
?>

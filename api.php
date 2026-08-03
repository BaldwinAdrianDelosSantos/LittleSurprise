<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$dataFile = __DIR__ . '/data/answers.json';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    echo json_encode(['result' => 'ok']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    
    if (!$data) {
        $data = [];
        foreach (explode('&', $raw) as $pair) {
            $kv = explode('=', $pair, 2);
            if (count($kv) === 2) {
                $data[urldecode($kv[0])] = urldecode(str_replace('+', ' ', $kv[1]));
            }
        }
    }
    
    $answers = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
    
    $answers[] = [
        'answer' => $data['answer'] ?? '',
        'text' => $data['text'] ?? '',
        'name' => $data['name'] ?? 'Anonymous',
        'igHandle' => $data['igHandle'] ?? 'Not provided',
        'device' => $data['device'] ?? 'Unknown',
        'url' => $data['url'] ?? '',
        'time' => $data['time'] ?? date('c')
    ];
    
    file_put_contents($dataFile, json_encode($answers, JSON_PRETTY_PRINT));
    echo json_encode(['result' => 'ok']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($dataFile)) {
        echo json_encode(['result' => 'ok', 'answers' => []]);
        exit;
    }
    
    $answers = json_decode(file_get_contents($dataFile), true) ?: [];
    echo json_encode(['result' => 'ok', 'answers' => array_reverse($answers)]);
    exit;
}

echo json_encode(['result' => 'error', 'error' => 'Invalid request']);
?>

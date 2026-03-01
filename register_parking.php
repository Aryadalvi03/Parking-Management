<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";  // Change this if needed
$password = "";  // Change if you have a MySQL password
$dbname = "flask_users";  // Ensure this matches your database name
$port = 3306;

$conn = new mysqli('localhost', 'root', '', 'flask_users',3306);


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$owner_name = $_POST['ownerName'] ?? '';
$parking_name = $_POST['parkingName'] ?? '';
$address = $_POST['address'] ?? '';
$total_spaces = $_POST['totalSpaces'] ?? 0;
$price_hour = $_POST['pricePerHour'] ?? 0.0;
$availability = $_POST['availableFrom'] ?? '';
$latitude = $_POST['latitude'] ?? 0.0;
$longitude = $_POST['longitude'] ?? 0.0;

// Validate required fields
if (empty($owner_name) || empty($parking_name) || empty($address) || empty($availability)) {
    exit(json_encode(["status" => "error", "message" => "Required fields are missing"]));
}

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO registration (owner_name, parking_name, address, total_space, price_hour, availability, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("sssidsdd", $owner_name, $parking_name, $address, $total_spaces, $price_hour, $availability, $latitude, $longitude);

// Execute and check for success
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Parking registered successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

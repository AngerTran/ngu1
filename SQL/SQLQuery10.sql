DECLARE @i INT = 1;
WHILE @i <= 30
BEGIN
    INSERT INTO users (created_at, email, enabled, password, userphone, role_id, status_id)
    VALUES (
        GETDATE(),
        CONCAT('consultant', @i, '@example.com'),
        1,
        '12345678',
        CONCAT('09', FORMAT(@i, '00000000')),
        3,
        1
    );
    SET @i += 1;
END;
-- Bước 1: Thêm 30 account là Consultant vào bảng `users`
DECLARE @i INT = 1;
WHILE @i <= 30
BEGIN
    INSERT INTO users (
        created_at,
        email,
        enabled,
        password,
        userphone,
        role_id,
        status_id
    )
    VALUES (
        GETDATE(),
        CONCAT('consultant_auto', @i, '@example.com'),
        1,
        '12345678',
        CONCAT('09', FORMAT(10000000 + @i, '00000000')),
        2,
        1
    );
    SET @i += 1;
END;

-- Bước 2: Thêm profile tương ứng cho các consultant mới
-- Giả định: các consultant mới vừa được thêm là 30 dòng cuối cùng có role_id = 2
DECLARE @profile_user_id INT;

DECLARE consultant_cursor CURSOR FOR
    SELECT user_id FROM users
    WHERE role_id = 2
    ORDER BY user_id DESC
    OFFSET 0 ROWS FETCH NEXT 30 ROWS ONLY;

OPEN consultant_cursor;
FETCH NEXT FROM consultant_cursor INTO @profile_user_id;

WHILE @@FETCH_STATUS = 0
BEGIN
    INSERT INTO profile (
        address,
        avatar_url,
        date_of_birth,
        description,
        experience_years,
        full_name,
        gender,
        specialty,
        user_id
    )
    VALUES (
        CONCAT('Auto Address ', @profile_user_id),
        NULL,
        '1990-01-01',
        NULL,
        FLOOR(RAND() * 10 + 1), 
        CONCAT('Auto Consultant ', @profile_user_id),
        CASE WHEN @profile_user_id % 2 = 0 THEN 0 ELSE 1 END,
        FLOOR(RAND() * 5 + 1),
        @profile_user_id
    );

    FETCH NEXT FROM consultant_cursor INTO @profile_user_id;
END;

CLOSE consultant_cursor;
DEALLOCATE consultant_cursor;

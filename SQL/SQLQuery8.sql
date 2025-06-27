DECLARE @id INT = 7;

WHILE @id <= 36
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
        CONCAT(N'Địa chỉ số ', @id),
        CONCAT(N'https://example.com/avatar', @id, '.png'), 
        DATEADD(YEAR, -20 - (@id % 10), GETDATE()),          
        CONCAT(N'Chuyên gia trong lĩnh vực ', @id),
        FLOOR(RAND() * 11),                                
        CONCAT(N'Tư vấn viên ', @id),
        CASE WHEN @id % 2 = 0 THEN 0 ELSE 1 END,           
        CASE
            WHEN @id % 5 = 0 THEN N'Tâm lý học'
            WHEN @id % 5 = 1 THEN N'Sức khỏe sinh sản'
            WHEN @id % 5 = 2 THEN N'Dinh dưỡng'
            WHEN @id % 5 = 3 THEN N'Bệnh lây qua đường tình dục'
            ELSE N'Tư vấn tiền hôn nhân'
        END,
        @id
    );
    SET @id += 1;
END;

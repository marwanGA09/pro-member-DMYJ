SELECT
  row_number() OVER () AS id,
  CASE
    WHEN (
      (membership_amount >= 10)
      AND (membership_amount < 20)
    ) THEN '10-20' :: text
    WHEN (
      (membership_amount >= 20)
      AND (membership_amount < 30)
    ) THEN '20-30' :: text
    WHEN (
      (membership_amount >= 30)
      AND (membership_amount < 40)
    ) THEN '30-40' :: text
    WHEN (
      (membership_amount >= 40)
      AND (membership_amount < 50)
    ) THEN '40-50' :: text
    WHEN (
      (membership_amount >= 50)
      AND (membership_amount < 100)
    ) THEN '50-100' :: text
    WHEN (
      (membership_amount >= 100)
      AND (membership_amount < 200)
    ) THEN '100-200' :: text
    WHEN (
      (membership_amount >= 200)
      AND (membership_amount < 500)
    ) THEN '200-500' :: text
    WHEN (
      (membership_amount >= 500)
      AND (membership_amount < 1000)
    ) THEN '500-1000' :: text
    ELSE '1000+' :: text
  END AS RANGE,
  count(*) AS count
FROM
  "Member"
GROUP BY
  CASE
    WHEN (
      (membership_amount >= 10)
      AND (membership_amount < 20)
    ) THEN '10-20' :: text
    WHEN (
      (membership_amount >= 20)
      AND (membership_amount < 30)
    ) THEN '20-30' :: text
    WHEN (
      (membership_amount >= 30)
      AND (membership_amount < 40)
    ) THEN '30-40' :: text
    WHEN (
      (membership_amount >= 40)
      AND (membership_amount < 50)
    ) THEN '40-50' :: text
    WHEN (
      (membership_amount >= 50)
      AND (membership_amount < 100)
    ) THEN '50-100' :: text
    WHEN (
      (membership_amount >= 100)
      AND (membership_amount < 200)
    ) THEN '100-200' :: text
    WHEN (
      (membership_amount >= 200)
      AND (membership_amount < 500)
    ) THEN '200-500' :: text
    WHEN (
      (membership_amount >= 500)
      AND (membership_amount < 1000)
    ) THEN '500-1000' :: text
    ELSE '1000+' :: text
  END
ORDER BY
  (row_number() OVER ());
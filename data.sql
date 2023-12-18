-- Database should be prime_feedback

-- Switch to "prime_feedback" before making:
-- Table to store the feedback
CREATE TABLE "feedback" (
  "id" serial primary key,
  "name" text,
  "feeling_text" text,
  "feeling" INT not null,
  "understanding_text" text,
  "understanding" INT not null,
  "support_text" text,
  "support" INT not null,
  "comments" text,
  "date" date not null default CURRENT_DATE
);

-- Sample feedback item
INSERT INTO "feedback" ("name", "feeling_text", "feeling", "understanding_text", "understanding", "support_text", "support", "comments")
VALUES ('John Doe', 'Good', 4, 'Well', 4, 'Very well', 5, 'Doing Great!');
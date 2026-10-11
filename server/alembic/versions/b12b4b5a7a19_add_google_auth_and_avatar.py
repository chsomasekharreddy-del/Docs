"""add Google identity and profile avatar"""

from alembic import op
import sqlalchemy as sa

revision = "b12b4b5a7a19"
down_revision = "e059ecb80839"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column("users", "password", existing_type=sa.String(), nullable=True)
    op.add_column("users", sa.Column("google_id", sa.String(), nullable=True))
    op.add_column("users", sa.Column("avatar_url", sa.String(), nullable=True))
    op.create_index("ix_users_google_id", "users", ["google_id"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_users_google_id", table_name="users")
    op.drop_column("users", "avatar_url")
    op.drop_column("users", "google_id")
    op.alter_column("users", "password", existing_type=sa.String(), nullable=False)

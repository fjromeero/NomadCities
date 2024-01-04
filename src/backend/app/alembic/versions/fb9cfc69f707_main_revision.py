"""Main revision

Revision ID: fb9cfc69f707
Revises: 
Create Date: 2024-01-04 13:15:01.574173

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fb9cfc69f707'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('city',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('country', sa.String(), nullable=False),
    sa.Column('continent', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('avg_rating', sa.Float(), nullable=False),
    sa.Column('avg_price_per_month', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_city_continent'), 'city', ['continent'], unique=False)
    op.create_index(op.f('ix_city_country'), 'city', ['country'], unique=False)
    op.create_index(op.f('ix_city_id'), 'city', ['id'], unique=False)
    op.create_index(op.f('ix_city_name'), 'city', ['name'], unique=False)
    op.create_table('tag',
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('name')
    )
    op.create_index(op.f('ix_tag_name'), 'tag', ['name'], unique=False)
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.Column('img', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=False)
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=True)
    op.create_table('city_suggested',
    sa.Column('id_city', sa.Integer(), nullable=False),
    sa.Column('id_suggestion', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['id_city'], ['city.id'], ),
    sa.ForeignKeyConstraint(['id_suggestion'], ['city.id'], ),
    sa.PrimaryKeyConstraint('id_city', 'id_suggestion')
    )
    op.create_index(op.f('ix_city_suggested_id_city'), 'city_suggested', ['id_city'], unique=False)
    op.create_index(op.f('ix_city_suggested_id_suggestion'), 'city_suggested', ['id_suggestion'], unique=False)
    op.create_table('city_tag',
    sa.Column('name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['name'], ['tag.name'], ),
    sa.PrimaryKeyConstraint('name')
    )
    op.create_index(op.f('ix_city_tag_name'), 'city_tag', ['name'], unique=False)
    op.create_table('comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_city', sa.Integer(), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=False),
    sa.Column('body', sa.Text(), nullable=False),
    sa.Column('date', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('reported', sa.Boolean(), nullable=True),
    sa.Column('polarity', sa.Integer(), nullable=True),
    sa.Column('price_per_month', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['id_city'], ['city.id'], ),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_comment_id'), 'comment', ['id'], unique=False)
    op.create_index(op.f('ix_comment_id_city'), 'comment', ['id_city'], unique=False)
    op.create_index(op.f('ix_comment_id_user'), 'comment', ['id_user'], unique=False)
    op.create_index(op.f('ix_comment_polarity'), 'comment', ['polarity'], unique=False)
    op.create_index(op.f('ix_comment_reported'), 'comment', ['reported'], unique=False)
    op.create_table('user_suggested',
    sa.Column('id_user', sa.Integer(), nullable=False),
    sa.Column('id_city', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['id_city'], ['city.id'], ),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id_user', 'id_city')
    )
    op.create_index(op.f('ix_user_suggested_id_city'), 'user_suggested', ['id_city'], unique=False)
    op.create_index(op.f('ix_user_suggested_id_user'), 'user_suggested', ['id_user'], unique=False)
    op.create_table('user_tag',
    sa.Column('name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['name'], ['tag.name'], ),
    sa.PrimaryKeyConstraint('name')
    )
    op.create_index(op.f('ix_user_tag_name'), 'user_tag', ['name'], unique=False)
    op.create_table('assign_city',
    sa.Column('id_city', sa.Integer(), nullable=False),
    sa.Column('tag_name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['id_city'], ['city.id'], ),
    sa.ForeignKeyConstraint(['tag_name'], ['city_tag.name'], ),
    sa.PrimaryKeyConstraint('id_city', 'tag_name')
    )
    op.create_index(op.f('ix_assign_city_id_city'), 'assign_city', ['id_city'], unique=False)
    op.create_index(op.f('ix_assign_city_tag_name'), 'assign_city', ['tag_name'], unique=False)
    op.create_table('assign_user',
    sa.Column('id_user', sa.Integer(), nullable=False),
    sa.Column('tag_name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.ForeignKeyConstraint(['tag_name'], ['user_tag.name'], ),
    sa.PrimaryKeyConstraint('id_user', 'tag_name')
    )
    op.create_index(op.f('ix_assign_user_id_user'), 'assign_user', ['id_user'], unique=False)
    op.create_index(op.f('ix_assign_user_tag_name'), 'assign_user', ['tag_name'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_assign_user_tag_name'), table_name='assign_user')
    op.drop_index(op.f('ix_assign_user_id_user'), table_name='assign_user')
    op.drop_table('assign_user')
    op.drop_index(op.f('ix_assign_city_tag_name'), table_name='assign_city')
    op.drop_index(op.f('ix_assign_city_id_city'), table_name='assign_city')
    op.drop_table('assign_city')
    op.drop_index(op.f('ix_user_tag_name'), table_name='user_tag')
    op.drop_table('user_tag')
    op.drop_index(op.f('ix_user_suggested_id_user'), table_name='user_suggested')
    op.drop_index(op.f('ix_user_suggested_id_city'), table_name='user_suggested')
    op.drop_table('user_suggested')
    op.drop_index(op.f('ix_comment_reported'), table_name='comment')
    op.drop_index(op.f('ix_comment_polarity'), table_name='comment')
    op.drop_index(op.f('ix_comment_id_user'), table_name='comment')
    op.drop_index(op.f('ix_comment_id_city'), table_name='comment')
    op.drop_index(op.f('ix_comment_id'), table_name='comment')
    op.drop_table('comment')
    op.drop_index(op.f('ix_city_tag_name'), table_name='city_tag')
    op.drop_table('city_tag')
    op.drop_index(op.f('ix_city_suggested_id_suggestion'), table_name='city_suggested')
    op.drop_index(op.f('ix_city_suggested_id_city'), table_name='city_suggested')
    op.drop_table('city_suggested')
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_table('user')
    op.drop_index(op.f('ix_tag_name'), table_name='tag')
    op.drop_table('tag')
    op.drop_index(op.f('ix_city_name'), table_name='city')
    op.drop_index(op.f('ix_city_id'), table_name='city')
    op.drop_index(op.f('ix_city_country'), table_name='city')
    op.drop_index(op.f('ix_city_continent'), table_name='city')
    op.drop_table('city')
    # ### end Alembic commands ###
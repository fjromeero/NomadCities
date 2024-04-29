"""Main revision

Revision ID: fb9cfc69f707
Revises: 
Create Date: 2024-01-04 13:15:01.574173

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from alembic_utils.pg_function import PGFunction
from alembic_utils.pg_trigger import PGTrigger


# revision identifiers, used by Alembic.
revision: str = 'f03a4b99bc40'
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
    sa.Column('avg_internet_connection', sa.Float(), nullable=False),
    sa.Column('avg_coworking_spaces', sa.Float(), nullable=False),
    sa.Column('avg_health_service', sa.Float(), nullable=False),
    sa.Column('avg_safety', sa.Float(), nullable=False),
    sa.Column('avg_gastronomy', sa.Float(), nullable=False),
    sa.Column('avg_means_of_transport', sa.Float(), nullable=False),
    sa.Column('avg_foreign_friendly', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_city_continent'), 'city', ['continent'], unique=False)
    op.create_index(op.f('ix_city_country'), 'city', ['country'], unique=False)
    op.create_index(op.f('ix_city_id'), 'city', ['id'], unique=False)
    op.create_index(op.f('ix_city_name'), 'city', ['name'], unique=False)
    op.create_table('tag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_tag_id'), 'tag', ['id'], unique=False)
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.Column('img', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=False)
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=True)
    op.create_table('city_image',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('id_city', sa.Integer(), nullable=False),
    sa.Column('path', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['id_city'], ['city.id'], ),
    sa.PrimaryKeyConstraint('id', 'id_city')
    )
    op.create_index(op.f('ix_city_image_id'), 'city_image', ['id'], unique=False)
    op.create_index(op.f('ix_city_image_id_city'), 'city_image', ['id_city'], unique=False)
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
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['tag.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_city_tag_id'), 'city_tag', ['id'], unique=False)
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
    sa.Column('internet_connection', sa.Integer(), nullable=False),
    sa.Column('coworking_spaces', sa.Integer(), nullable=False),
    sa.Column('health_service', sa.Integer(), nullable=False),
    sa.Column('safety', sa.Integer(), nullable=False),
    sa.Column('gastronomy', sa.Integer(), nullable=False),
    sa.Column('means_of_transport', sa.Integer(), nullable=False),
    sa.Column('foreign_friendly', sa.Integer(), nullable=False),
    sa.Column('stay_length', sa.Integer(), nullable=False),
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
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['tag.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_tag_id'), 'user_tag', ['id'], unique=False)
    op.create_table('assign_city',
    sa.Column('id_city', sa.Integer(), nullable=False),
    sa.Column('id_city_tag', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), default=1),
    sa.ForeignKeyConstraint(['id_city'], ['city.id'], ),
    sa.ForeignKeyConstraint(['id_city_tag'], ['city_tag.id'], ),
    sa.PrimaryKeyConstraint('id_city', 'id_city_tag')
    )
    op.create_index(op.f('ix_assign_city_id_city'), 'assign_city', ['id_city'], unique=False)
    op.create_index(op.f('ix_assign_city_id_city_tag'), 'assign_city', ['id_city_tag'], unique=False)
    op.create_table('assign_user',
    sa.Column('id_user', sa.Integer(), nullable=False),
    sa.Column('id_user_tag', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.ForeignKeyConstraint(['id_user_tag'], ['user_tag.id'], ),
    sa.PrimaryKeyConstraint('id_user', 'id_user_tag')
    )
    op.create_index(op.f('ix_assign_user_id_user'), 'assign_user', ['id_user'], unique=False)
    op.create_index(op.f('ix_assign_user_id_user_tag'), 'assign_user', ['id_user_tag'], unique=False)

    public_func_update_avg_ratings = PGFunction(
        schema="public",
        signature="func_update_avg_ratings()",
        definition='RETURNS TRIGGER AS $$\nBEGIN\n    UPDATE city\n    SET \n        avg_rating = (SELECT AVG(rating) FROM comment WHERE city.id = NEW.id_city),\n        avg_price_per_month = (SELECT AVG(price_per_month) FROM comment WHERE city.id = NEW.id_city),\n        avg_internet_connection = (SELECT AVG(internet_connection) FROM comment WHERE city.id = NEW.id_city),\n        avg_coworking_spaces = (SELECT AVG(coworking_spaces) FROM comment WHERE city.id = NEW.id_city),\n        avg_health_service = (SELECT AVG(health_service) FROM comment WHERE city.id = NEW.id_city),\n        avg_safety = (SELECT AVG(safety) FROM comment WHERE city.id = NEW.id_city),\n        avg_gastronomy = (SELECT AVG(gastronomy) FROM comment WHERE city.id = NEW.id_city),\n        avg_means_of_transport = (SELECT AVG(means_of_transport) FROM comment WHERE city.id = NEW.id_city),\n        avg_foreign_friendly = (SELECT AVG(foreign_friendly) FROM comment WHERE city.id = NEW.id_city)\n    WHERE id = NEW.id_city;\n    \n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql'
    )
    op.create_entity(public_func_update_avg_ratings)

    public_comment_compute_avg_ratings = PGTrigger(
        schema="public",
        signature="compute_avg_ratings",
        on_entity="public.comment",
        is_constraint=False,
        definition='AFTER INSERT ON comment\n        FOR EACH ROW\n        EXECUTE FUNCTION func_update_avg_ratings()'
    )
    op.create_entity(public_comment_compute_avg_ratings)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_assign_user_id_user_tag'), table_name='assign_user')
    op.drop_index(op.f('ix_assign_user_id_user'), table_name='assign_user')
    op.drop_table('assign_user')
    op.drop_index(op.f('ix_assign_city_id_city_tag'), table_name='assign_city')
    op.drop_index(op.f('ix_assign_city_id_city'), table_name='assign_city')
    op.drop_table('assign_city')
    op.drop_index(op.f('ix_user_tag_id'), table_name='user_tag')
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
    op.drop_index(op.f('ix_city_tag_id'), table_name='city_tag')
    op.drop_table('city_tag')
    op.drop_index(op.f('ix_city_suggested_id_suggestion'), table_name='city_suggested')
    op.drop_index(op.f('ix_city_suggested_id_city'), table_name='city_suggested')
    op.drop_table('city_suggested')
    op.drop_index(op.f('ix_city_image_id_city'), table_name='city_image')
    op.drop_index(op.f('ix_city_image_id'), table_name='city_image')
    op.drop_table('city_image')
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_index(op.f('ix_tag_id'), table_name='tag')
    op.drop_table('tag')
    op.drop_index(op.f('ix_city_name'), table_name='city')
    op.drop_index(op.f('ix_city_id'), table_name='city')
    op.drop_index(op.f('ix_city_country'), table_name='city')
    op.drop_index(op.f('ix_city_continent'), table_name='city')
    op.drop_table('city')

    public_comment_compute_avg_ratings = PGTrigger(
        schema="public",
        signature="compute_avg_ratings",
        on_entity="public.comment",
        is_constraint=False,
        definition='AFTER INSERT ON comment\n        FOR EACH ROW\n        EXECUTE FUNCTION func_update_avg_ratings()'
    )
    op.drop_entity(public_comment_compute_avg_ratings)

    public_func_update_avg_ratings = PGFunction(
        schema="public",
        signature="func_update_avg_ratings()",
        definition='RETURNS TRIGGER AS $$\nBEGIN\n    UPDATE city\n    SET \n        avg_rating = (SELECT AVG(rating) FROM comment WHERE city.id = NEW.id_city),\n        avg_price_per_month = (SELECT AVG(price_per_month) FROM comment WHERE city.id = NEW.id_city),\n        avg_internet_connection = (SELECT AVG(internet_connection) FROM comment WHERE city.id = NEW.id_city),\n        avg_coworking_spaces = (SELECT AVG(coworking_spaces) FROM comment WHERE city.id = NEW.id_city),\n        avg_health_service = (SELECT AVG(health_service) FROM comment WHERE city.id = NEW.id_city),\n        avg_safety = (SELECT AVG(safety) FROM comment WHERE city.id = NEW.id_city),\n        avg_gastronomy = (SELECT AVG(gastronomy) FROM comment WHERE city.id = NEW.id_city),\n        avg_means_of_transport = (SELECT AVG(means_of_transport) FROM comment WHERE city.id = NEW.id_city),\n        avg_foreign_friendly = (SELECT AVG(foreign_friendly) FROM comment WHERE city.id = NEW.id_city)\n    WHERE id = NEW.id_city;\n    \n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql'
    )
    op.drop_entity(public_func_update_avg_ratings)
    # ### end Alembic commands ###
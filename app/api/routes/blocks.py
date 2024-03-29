from flask import Blueprint, request
from app.models import db, Block

bp = Blueprint('blocks', __name__)

@bp.route('', methods=['POST'])
def block_user():
    user_id = request.form.get('id')
    blocked_id = request.form.get('blocked_id')
    newBlock = Block(user_id = user_id, blocked_id = blocked_id)
    db.session.add(newBlock)
    db.session.commit()
    return newBlock.to_dict()

@bp.route('/<int:id>')
def get_blocks(id):
    block_list = Block.query.filter(Block.user_id == id)
    return {result.id: result.blocked_id for result in block_list}
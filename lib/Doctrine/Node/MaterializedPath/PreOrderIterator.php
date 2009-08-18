<?php
/*
 *  $Id: PreOrderIterator.php 2963 2007-10-21 06:23:59Z Jonathan.Wage $
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * This software consists of voluntary contributions made by many individuals
 * and is licensed under the LGPL. For more information, see
 * <http://www.phpdoctrine.com>.
 */

/**
 * Doctrine_Node_MaterializedPath_PreOrderIterator
 *
 * @package     Doctrine
 * @subpackage  Node
 * @license     http://www.opensource.org/licenses/lgpl-license.php LGPL
 * @link        www.phpdoctrine.com
 * @since       1.0
 * @version     $Revision: 2963 $
 * @author      Joe Simms <joe.simms@websites4.com>
 */
class Doctrine_Node_MaterializedPath_PreOrderIterator implements Iterator
{
    private $topNode = null;

    private $curNode = null;

    public function __construct($node, $opts)
    {
        throw new Doctrine_Exception('Not yet implemented');
    }

    public function rewind()
    {
        throw new Doctrine_Exception('Not yet implemented');
    }

    public function valid()
    {
        throw new Doctrine_Exception('Not yet implemented');
    }

    public function current()
    {
        throw new Doctrine_Exception('Not yet implemented');
    }

    public function key()
    {
        throw new Doctrine_Exception('Not yet implemented');
    }

    public function next()
    {
        throw new Doctrine_Exception('Not yet implemented');
    }
}